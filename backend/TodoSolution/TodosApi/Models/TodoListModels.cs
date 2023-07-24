using System.ComponentModel.DataAnnotations;

namespace TodosApi.Models;

public enum TodoItemStatus
{
    Later, Now, Waiting, Completed
}

public record TodoListItemResponseModel(Guid Id, string Description, TodoItemStatus Status);

public record TodoListCreateModel
{
    // Validator about the Description field
    [Required, MaxLength(100)]
    public string Description { get; set; } = string.Empty;
}