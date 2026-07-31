import type { ApplicationStatus, JobApplicationListItemDto } from "../types/jobApplications.types";

export const COLUMNS = ['Applied', 'Screening', 'Interviewing', 'Offer', 'Closed'] as const;
export type Column = typeof COLUMNS[number];

export const STATUS_TO_COLUMN: Record<ApplicationStatus, Column> = {
  Applied: 'Applied',
  OnlineAssessment: 'Screening',
  PhoneScreen: 'Screening',
  TechnicalInterview: 'Interviewing',
  OnsiteInterview: 'Interviewing',
  OfferReceived: 'Offer',
  OfferAccepted: 'Offer',
  Rejected: 'Closed',
  Withdrawn: 'Closed',
  Ghosted: 'Closed',
};

export const COLUMN_STATUSES: Record<Column, ApplicationStatus[]> = {
  Applied: ['Applied'],
  Screening: ['OnlineAssessment', 'PhoneScreen'],
  Interviewing: ['TechnicalInterview', 'OnsiteInterview'],
  Offer: ['OfferReceived', 'OfferAccepted'],
  Closed: ['Rejected', 'Withdrawn', 'Ghosted'],
};

export function groupByColumn(items: JobApplicationListItemDto[]) {
  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col] = [];
    return acc;
  }, {} as Record<Column, JobApplicationListItemDto[]>);

  for (const item of items) {
    grouped[STATUS_TO_COLUMN[item.currentStatus]].push(item);
  }
  return grouped;
}