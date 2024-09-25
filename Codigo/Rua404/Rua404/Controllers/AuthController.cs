namespace Rua404.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Rua404.Domain.Entities;
    using Rua404.Domain.NewFolder;
    using Rua404.Infraestrutura;
    using Rua404.Infraestrutura.Services;
    using System.ComponentModel.DataAnnotations;
    using System.Web.Http.Cors;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private Rua404DbContext _db;
        private readonly IConfiguration _configuration;
        private readonly IAuthRepository _authRepository;
        public AuthController(Rua404DbContext db, IConfiguration configuration, IAuthRepository authRepository)
        {
            _db = db;
            _configuration = configuration;
            _authRepository = authRepository;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var token = await _authRepository.Login(loginModel.Email, loginModel.Password);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistreModel customer)
        {
            //var userExists = await _authRepository.UserExists(customer.Email);

            //if (userExists)
            //{
            //    return BadRequest("Email already exists");
            //}

            var createdUser = await _authRepository.Register(customer.Email, customer.Password, customer.UserName, customer.Id);

            return StatusCode(201);
        }


    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
 
    }

    public class RegistreModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? UserName { get; set; }
    }

}
