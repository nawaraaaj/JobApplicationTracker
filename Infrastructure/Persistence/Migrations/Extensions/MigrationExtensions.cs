using FluentMigrator;
using FluentMigrator.Builders.Create.Table;

namespace Infrastructure.Persistence.Migrations.Extensions;

public static class MigrationExtensions
{
    public static ICreateTableColumnOptionOrWithColumnSyntax WithAuditColumns(
        this ICreateTableColumnOptionOrWithColumnSyntax table)
    {
        return table
            .WithColumn("CreatedAt").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("UpdatedAt").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("IsDeleted").AsBoolean().NotNullable().WithDefaultValue(false)
            .WithColumn("DeletedAt").AsDateTime().Nullable();
    }
}
