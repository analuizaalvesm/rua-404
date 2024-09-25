using Microsoft.AspNetCore.Mvc;
using Rua404.Domain.Entities;
using Rua404.Infraestrutura;

namespace Rua404.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private Rua404DbContext _db;

        public ProductsController(Rua404DbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var teste = _db.Products.ToList();
            return Ok(teste);
        }

        [HttpPost]
        public IActionResult Add(Product teste)
        {
            var testes = _db.Products.Add(teste);
            _db.SaveChanges();
            return Ok(testes.Entity);
        }
    }
}
