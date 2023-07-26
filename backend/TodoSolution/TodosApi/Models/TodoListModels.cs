using System.ComponentModel.DataAnnotations;

namespace TodosApi.Models;

public enum TodoItemStatus
{
    Later, Now, Waiting, Completed
}

public record TodoListItemResponseModel(Guid Id, string Description, TodoItemStatus Status);

public record TodoListItemRequestModel
{
    [Required]
    public Guid? Id { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public TodoItemStatus? Status { get; set; }
}

public record TodoListCreateModel
{
    // Validator about the Description field
    [Required, MaxLength(100)]
    public string Description { get; set; } = string.Empty;
}