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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var typeDatabase = _configuration["TypeDatabase"];
            var connectionString = _configuration.GetConnectionString(typeDatabase);

            optionsBuilder.UseNpgsql(connectionString);
        }
    }
}
