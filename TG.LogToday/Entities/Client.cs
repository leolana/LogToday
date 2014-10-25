using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LogToday.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string ClientKey { get; set; }
    }
}