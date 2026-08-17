using FluentMigrator;

namespace Infrastructure.Persistence.Migrations;

[Migration(05)]
public class AddAuthProviderToUsers : Migration
{
    public override void Up()
    {
        Alter.Table("Users")
            .AddColumn("AuthProvider")
            .AsInt32()
            .NotNullable()
            .WithDefaultValue(0);

        Alter.Table("Users")
            .AlterColumn("PasswordHash")
            .AsString()
            .Nullable();
    }

    public override void Down()
    {
        Delete.Column("AuthProvider").FromTable("Users");
        Alter.Table("Users")
            .AlterColumn("PasswordHash")
            .AsString()
            .NotNullable();
    }
}