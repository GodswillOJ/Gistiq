namespace api.Modules.Posts.DTOs;

public class ContentBlockDto
{
    public Guid? Id { get; set; } 
    public string Type { get; set; }
    public string Content { get; set; }
}