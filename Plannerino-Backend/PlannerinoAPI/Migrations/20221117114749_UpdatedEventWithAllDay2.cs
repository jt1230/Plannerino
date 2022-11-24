using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlannerinoAPI.Migrations
{
    public partial class UpdatedEventWithAllDay2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllDay",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllDay",
                table: "Events");
        }
    }
}
