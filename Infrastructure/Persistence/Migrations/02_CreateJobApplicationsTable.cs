using FluentMigrator;
using Infrastructure.Persistence.Migrations.Extensions;

namespace Infrastructure.Persistence.Migrations;

[Migration(02)]
public class CreateJobApplicationsTable : Migration
{
    public override void Up()
    {
        Create.Table("JobApplications")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("UserId").AsGuid().NotNullable()
            .WithColumn("CompanyName").AsString(200).NotNullable()
            .WithColumn("JobTitle").AsString(200).NotNullable()
            .WithColumn("Location").AsString(200).Nullable()
            .WithColumn("AppliedDate").AsDateTime().NotNullable()
            .WithColumn("Salary").AsString(100).Nullable()
            .WithColumn("Notes").AsString(2000).Nullable()
            .WithColumn("CurrentStatus").AsByte().NotNullable()
            .WithColumn("Source").AsByte().NotNullable()
            .WithColumn("WorkMode").AsByte().NotNullable()
            .WithAuditColumns();

        Create.ForeignKey("FK_JobApplications_Users")
            .FromTable("JobApplications").ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("IX_JobApplications_UserId")
            .OnTable("JobApplications")
            .OnColumn("UserId");
    }

    public override void Down()
    {
        Delete.Table("JobApplications");
    }
}