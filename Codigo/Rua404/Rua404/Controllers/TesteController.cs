using Microsoft.AspNetCore.Mvc;
using Rua404.Domain.Entities;
using Rua404.Infraestrutura;

namespace Rua404.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TesteController : Controller
    {
        private Rua404DbContext _db;

        public TesteController(Rua404DbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var teste = _db.Teste.ToList();
            return Ok(teste);
        }

        [HttpPost]
        public IActionResult Add(Teste teste)
        {
            var testes = _db.Teste.Add(teste);
            _db.SaveChanges();
            return Ok(testes.Entity);
        }
    }
}
