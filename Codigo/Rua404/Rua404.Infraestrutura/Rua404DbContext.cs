using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Rua404.Domain.Entities;

namespace Rua404.Infraestrutura
{
    public class Rua404DbContext : DbContext
    {
        private IConfiguration _configuration;

        public DbSet<Teste> Teste { get; set; }
        public Rua404DbContext(IConfiguration configuration, DbContextOptions options) : base(options)
        {
            _configuration = configuration;
        }

        // Defina as DbSets para suas tabelas
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var typeDatabase = _configuration["TypeDatabase"];
            var connectionString = _configuration.GetConnectionString(typeDatabase);

            optionsBuilder.UseNpgsql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Definindo relacionamentos
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.CustomerId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Staff)
                .WithMany(s => s.Orders)
                .HasForeignKey(o => o.StaffId);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Staff)
                .WithMany(s => s.Payments)
                .HasForeignKey(p => p.StaffId);

            modelBuilder.Entity<Store>()
            .HasOne(s => s.ManagerStaff)           
            .WithOne()                             
            .HasForeignKey<Store>(s => s.ManagerStaffId);

            modelBuilder.Entity<Login>()
           .HasNoKey(); // Define a entidade como sem chave

            //modelBuilder.Entity<Customer>()
            // .HasOne(c => c.Store)
            // .WithMany(s => s.Customers)
            // .HasForeignKey(c => c.StoreId);
        }
    }
}
