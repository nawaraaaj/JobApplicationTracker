using FluentMigrator;
using Infrastructure.Persistence.Migrations.Extensions;

namespace Infrastructure.Persistence.Migrations;

[Migration(03)]
public class CreateStatusHistoriesTable : Migration
{
    public override void Up()
    {
        Create.Table("StatusHistories")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("JobApplicationId").AsGuid().NotNullable()
            .WithColumn("Status").AsByte().NotNullable()
            .WithColumn("ChangedAt").AsDateTime().NotNullable()
            .WithColumn("Notes").AsString(2000).Nullable()
            .WithAuditColumns();

        Create.ForeignKey("FK_StatusHistories_JobApplications")
            .FromTable("StatusHistories").ForeignColumn("JobApplicationId")
            .ToTable("JobApplications").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("IX_StatusHistories_JobApplicationId")
            .OnTable("StatusHistories")
            .OnColumn("JobApplicationId");
    }

    public override void Down()
    {
        Delete.Table("StatusHistories");
    }

}