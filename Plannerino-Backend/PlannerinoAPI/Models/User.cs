using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string Email { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string Password { get; set; } = "";
        public bool IsAdmin { get; set; }
        public ICollection<Event> Events { get; set; } = new List<Event>();
        public ICollection<UserTask> Tasks { get; set; } = new List<UserTask>();
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();


    }
}
