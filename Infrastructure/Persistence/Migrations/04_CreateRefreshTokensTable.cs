using FluentMigrator;

namespace Infrastructure.Persistence.Migrations;

[Migration(04)]
public class CreateRefreshTokensTable : Migration
{
    public override void Up()
    {
        Create.Table("RefreshTokens")
            .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
            .WithColumn("UserId").AsGuid().NotNullable()
            .WithColumn("TokenHash").AsString(256).NotNullable().Unique()
            .WithColumn("ExpiresAtUtc").AsDateTime().NotNullable()
            .WithColumn("CreatedAtUtc").AsDateTime().NotNullable()
            .WithColumn("RevokedAtUtc").AsDateTime().Nullable()
            .WithColumn("ReplacedByTokenId").AsGuid().Nullable();

        Create.ForeignKey("FK_RefreshTokens_Users")
            .FromTable("RefreshTokens").ForeignColumn("UserId")
            .ToTable("Users").PrimaryColumn("Id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("IX_RefreshTokens_UserId")
            .OnTable("RefreshTokens")
            .OnColumn("UserId");
    }

    public override void Down()
    {
        Delete.Table("RefreshTokens");
    }
}