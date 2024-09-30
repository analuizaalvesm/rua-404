using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Rua404.Domain.Entities;
using Rua404.Domain.NewFolder;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Rua404.Infraestrutura.Services
{
    public class AuthService : IAuthRepository
    {
        private Rua404DbContext _db;
        private readonly IConfiguration _configuration;
        public AuthService(Rua404DbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }
        public async Task<string> Login(string email, string password)
        {
            var user = _db.Login.FirstOrDefault(u => u.Email == email && u.Password == password && u.Id == 1);

            if (user == null)
            {
                return null;
            }

            var token = GenerateJwtToken(user.Email);
            return token;
        }


        public async Task<string> Register(string email, string password, string userName, int id)
        {
            if (email != null)
            {
                _db.Login.Add(new Login
                {
                    Email = email,
                    Password = password,
                    UserName = userName,
                    Id = id
                });
                _db.SaveChanges();

                //_db.Customer.Add(new Customer
                //{
                //    CreateDate = DateTime.Now,
                //    FirstName = user.FirstName,
                //    LastName = user.FirstName,
                //    Email = user.Email,
                //    Active = true,
                //    Password = user.Password,
                //});
            }

            return "OK";
        }

        public Task<bool> UserExists(string email)
        {
            _db.Login.
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
}
