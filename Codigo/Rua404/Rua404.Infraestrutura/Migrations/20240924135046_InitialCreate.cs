using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Rua404.Infraestrutura.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Tabela Customer
            migrationBuilder.CreateTable(
                name: "customer",
                columns: table => new
                {
                    customer_id = table.Column<short>(type: "SMALLINT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    store_id = table.Column<byte>(type: "TINYINT", nullable: false),
                    first_name = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    last_name = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    email = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    address = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    active = table.Column<bool>(type: "BOOLEAN", nullable: false),
                    create_date = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    last_update = table.Column<DateTime>(type: "TIMESTAMP", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_customer", x => x.customer_id);
                    table.ForeignKey(
                        name: "FK_customer_store",
                        column: x => x.store_id,
                        principalTable: "store",
                        principalColumn: "store_id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Tabela Staff
            migrationBuilder.CreateTable(
                name: "staff",
                columns: table => new
                {
                    staff_id = table.Column<byte>(type: "TINYINT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    last_name = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    email = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    address_id = table.Column<short>(type: "SMALLINT", nullable: false),
                    store_id = table.Column<byte>(type: "TINYINT", nullable: false),
                    active = table.Column<bool>(type: "BOOLEAN", nullable: false),
                    username = table.Column<string>(type: "VARCHAR(16)", nullable: false),
                    password = table.Column<string>(type: "VARCHAR(40)", nullable: true),
                    last_update = table.Column<DateTime>(type: "TIMESTAMP", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staff", x => x.staff_id);
                    table.ForeignKey(
                        name: "FK_staff_store",
                        column: x => x.store_id,
                        principalTable: "store",
                        principalColumn: "store_id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Tabela Products
            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    inventory_id = table.Column<int>(type: "INT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    product_name = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    product_price = table.Column<string>(type: "VARCHAR(45)", nullable: false),
                    product_quantity = table.Column<int>(type: "INT", nullable: false),
                    last_updated = table.Column<DateTime>(type: "TIMESTAMP", nullable: true),
                    url = table.Column<string>(type: "VARCHAR(500)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.inventory_id);
                });

            // Tabela Store
            migrationBuilder.CreateTable(
                name: "store",
                columns: table => new
                {
                    store_id = table.Column<byte>(type: "TINYINT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    manager_staff_id = table.Column<byte>(type: "TINYINT", nullable: true),
                    address_id = table.Column<short>(type: "SMALLINT", nullable: false),
                    last_update = table.Column<DateTime>(type: "TIMESTAMP", nullable: true),
                    products_inventory_id = table.Column<int>(type: "INT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_store", x => x.store_id);
                    table.ForeignKey(
                        name: "FK_store_products",
                        column: x => x.products_inventory_id,
                        principalTable: "products",
                        principalColumn: "inventory_id",
                        onDelete: ReferentialAction.Restrict);
                });

            // Tabela Payment
            migrationBuilder.CreateTable(
                name: "payment",
                columns: table => new
                {
                    payment_id = table.Column<short>(type: "SMALLINT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    customer_id = table.Column<short>(type: "SMALLINT", nullable: false),
                    staff_id = table.Column<byte>(type: "TINYINT", nullable: false),
                    amount = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: false),
                    payment_date = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    last_update = table.Column<DateTime>(type: "TIMESTAMP", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payment", x => x.payment_id);
                    table.ForeignKey(
                        name: "FK_payment_customer",
                        column: x => x.customer_id,
                        principalTable: "customer",
                        principalColumn: "customer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_payment_staff",
                        column: x => x.staff_id,
                        principalTable: "staff",
                        principalColumn: "staff_id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Tabela Order
            migrationBuilder.CreateTable(
                name: "order",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "INT", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    order_date = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    inventory_id = table.Column<int>(type: "MEDIUMINT", nullable: false),
                    customer_id = table.Column<short>(type: "SMALLINT", nullable: false),
                    return_date = table.Column<DateTime>(type: "DATETIME", nullable: true),
                    staff_id = table.Column<byte>(type: "TINYINT", nullable: false),
                    last_update = table.Column<DateTime>(type: "TIMESTAMP", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order", x => x.order_id);
                    table.ForeignKey(
                        name: "FK_order_customer",
                        column: x => x.customer_id,
                        principalTable: "customer",
                        principalColumn: "customer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_products",
                        column: x => x.inventory_id,
                        principalTable: "products",
                        principalColumn: "inventory_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_staff",
                        column: x => x.staff_id,
                        principalTable: "staff",
                        principalColumn: "staff_id",
                        onDelete: ReferentialAction.Cascade);
                });
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "payment");
            migrationBuilder.DropTable(name: "order");
            migrationBuilder.DropTable(name: "staff");
            migrationBuilder.DropTable(name: "customer");
            migrationBuilder.DropTable(name: "store");
            migrationBuilder.DropTable(name: "products");
        }

    }
}
