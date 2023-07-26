
using TodosApi.Models;
using TodosApi.Services;

namespace TodosApi.UnitTests;

public class StatusCyclerTests
{
    [Fact]
    public void CanCycleTheStatusFromLaterToNow()
    {
        IProvideStatusCycling cycler = new StatusCycler();
        var beforeItem = new TodoListItemResponseModel(Guid.NewGuid(), "Tacos", TodoItemStatus.Later);
        var expectedAfterItem = beforeItem with { Status = TodoItemStatus.Now };

        var actual = cycler.ProvideNextStatusFrom(beforeItem);

        Assert.Equal(expectedAfterItem, actual);
    }

    [Fact]
    public void CanCycleTheStatusFromNowToWaiting()
    {
        IProvideStatusCycling cycler = new StatusCycler();
        var beforeItem = new TodoListItemResponseModel(Guid.NewGuid(), "Tacos", TodoItemStatus.Now);
        var expectedAfterItem = beforeItem with { Status = TodoItemStatus.Waiting };

        var actual = cycler.ProvideNextStatusFrom(beforeItem);

        Assert.Equal(expectedAfterItem, actual);
    }

    [Fact]
    public void CanCycleTheStatusFromWaitingToCompleted()
    {
        IProvideStatusCycling cycler = new StatusCycler();
        var beforeItem = new TodoListItemResponseModel(Guid.NewGuid(), "Tacos", TodoItemStatus.Waiting);
        var expectedAfterItem = beforeItem with { Status = TodoItemStatus.Completed };

        var actual = cycler.ProvideNextStatusFrom(beforeItem);

        Assert.Equal(expectedAfterItem, actual);
    }

    [Fact]
    public void CanCycleTheStatusFromCompletedToLater()
    {
        IProvideStatusCycling cycler = new StatusCycler();
        var beforeItem = new TodoListItemResponseModel(Guid.NewGuid(), "Tacos", TodoItemStatus.Completed);
        var expectedAfterItem = beforeItem with { Status = TodoItemStatus.Later };

        var actual = cycler.ProvideNextStatusFrom(beforeItem);

        Assert.Equal(expectedAfterItem, actual);
    }
}
