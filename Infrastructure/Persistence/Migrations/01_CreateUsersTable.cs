using FluentMigrator;
using Infrastructure.Persistence.Migrations.Extensions;

namespace Infrastructure.Persistence.Migrations;

[Migration(01)]
public class CreateUsersTable : Migration
{
    public override void Up ()
    {
        Create.Table("Users")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("Name").AsString().NotNullable()
            .WithColumn("Email").AsString().NotNullable().Unique()
            .WithColumn("PasswordHash").AsString().NotNullable()
            .WithAuditColumns();
    }

    public override void Down()
    {
        Delete.Table("Users");
    }
}
