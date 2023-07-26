using Marten;
using Microsoft.AspNetCore.Mvc;
using TodosApi.Services;

namespace TodosApi.Controllers;

[ApiController] // Performs validation
public class TodoListController : ControllerBase
{
    private readonly IManageTheTodolistCatalog _todoListCatalog;

    public TodoListController(IManageTheTodolistCatalog todoListCatalog)
    {
        _todoListCatalog = todoListCatalog;
    }

    // POST /todo-list-status-changes
    [HttpPost("/todo-list-status-change")]
    public async Task<ActionResult> ChangeTheStatusOf([FromBody] TodoListItemRequestModel request)
    {
        TodoListItemResponseModel? response = await _todoListCatalog.ChangeStatusAsync(request);
        if (response == null)
        {
            return BadRequest("No item with that Id to change the status of");
        }
        return Ok(response);
    }

    [HttpPost("/todo-list")]
    public async Task<ActionResult> AddTodoItem([FromBody] TodoListCreateModel request)
    {
        // We don't want the controller to know about the document session
        TodoListItemResponseModel response = await _todoListCatalog.AddTodoItemAsync(request);
        return Ok(response);
    }

    // GET todo-list
    [HttpGet("/todo-list")]
    public async Task<ActionResult> GetTodoList()
    {
        CollectionResponse<TodoListItemResponseModel> list = await _todoListCatalog.GetFullListAsync();
        return Ok(list);
    }
}