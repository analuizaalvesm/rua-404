namespace Rua404.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Rua404.Infraestrutura;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Web.Http.Cors;

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private Rua404DbContext _db;
        private readonly IConfiguration _configuration;
        public AuthController(Rua404DbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user = _db.Login.FirstOrDefault(u => u.Email == loginModel.Email && u.Password == loginModel.Password);

            if (user == null )
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user.Email);

            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            string chaveSecreta = "EstaEhUmaChaveSecretaLongaEAleatoriaQueTemPeloMenos32Bytes";

            var chaveSimetrica = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta));

            var credenciais = new SigningCredentials(chaveSimetrica, SecurityAlgorithms.HmacSha256);


            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "NomeDoUsuario"),
                new Claim(ClaimTypes.Role, "Usuario")
            };


            var token = new JwtSecurityToken(
                issuer: "SeuIssuer",
                audience: "SeuAudience",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credenciais);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
