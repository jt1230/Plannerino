using System.ComponentModel.DataAnnotations;

namespace PlannerinoAPI.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; } = "";
        [MaxLength(200)]
        public string Description { get; set; } = "";
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "";
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now;
        public User User { get; set; } = new User();

    }
}
