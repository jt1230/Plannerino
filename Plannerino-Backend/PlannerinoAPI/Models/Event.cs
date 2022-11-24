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
        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = "";
        public bool AllDay { get; set; } = false;
        public DateTime Start { get; set; } = DateTime.Now;
        public DateTime End { get; set; } = DateTime.Now;
        public User User { get; set; } = new User();

    }
}
