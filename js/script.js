let items = 0; //number of todo-list created
let filterActive = ".todo-list__new"; //delete task list depending on filter

$(document).ready(()=>{

    //Mode dark and light
    $(".todo-list__mode").click(function(){
        $("body").toggleClass('toggle-dark')
    });

    

    $("#input").change(addTodoItem);

    //.todo-list__created is the event handler because .todo-list-delete doesn't exist when the document loads, it is generated later by a todo entry
    //https://learn.jquery.com/events/event-delegation/
    $(".todo-list__created").on("click",".todo-list__delete ", function(){
        let itemRemove = $(this).parent()
        itemRemove.hide(400, () => {
            itemRemove.remove()
            items -= 1;
            $("#items-left").html(items)
        })
    })

    $(".todo-list__created").on("click", ".btn", function(){
        $(this).parent().toggleClass("task-done")
        $(this).parent().toggleClass("task-undone")
        $(this).after().toggleClass("check")
    })

    //sortable to move items
    //https://jqueryui.com/sortable/
    $( ".todo-list__created" ).sortable({
        revert: true
    });
    
    
    /*Filtering's section */
    $(".all").click(() => {
        filterActive = ".todo-list__new";//changing value to delete only todo-list "All"
        $(".todo-list__new").show();
        $(".todo-list__new").show();

        $(".filter__center p").css("color", "inherit")
        $(".all").css("color", "hsl(220, 98%, 61%)")
    });
    $(".active").click(() => {
        filterActive = ".task-undone";//changing value to delete only todo-list "Active"
        $(".todo-list__new").show()
        $(".task-done").hide();

        $(".filter__center").children().css("color", "inherit")
        $(".active").css("color", "hsl(220, 98%, 61%)")
    });
    $(".complete").click(() => {
        filterActive = ".task-done";//changing value to delete only todo-list "Complete"
        $(".todo-list__new").hide()
        $(".task-done").show();

        $(".filter__center p").css("color", "inherit")
        $(".complete").css("color", "hsl(220, 98%, 61%)")
    });

    
    $("#clear").click(deleteItems);


    $("#items-left").html(items)
});

const deleteItems = () => {
    $(filterActive).css("transition", "1.5s")
    $(filterActive).css('transform', 'translateX(-500px)')

    //Animation effect to the remove all items
    for (let i = $(".todo-list__created").height(); i > 0; i--) {
        setTimeout(() => {
            $(".todo-list__created").css("height", i + "px")
        }, 1000)
    }

    //wait for the animation to finish remove items 
    setTimeout(() => {
        $(filterActive).remove()
        $(".todo-list__created").css("height", "auto")
    }, 1500)
    
    items = items - $(filterActive).length;
    $("#items-left").html(items)

}

const addTodoItem = () =>{
    let value = $("#input").val()
    //new todo-list with their classes added
    if(value.trim().length > 0){
        $(".todo-list__created").append(`
        <div class="todo-list__new task-undone">
            <div class=${"btn"}></div>
            <p>${value}</p>
            <span class="${"todo-list__delete"}" id="remove"></span>
        </div>`)
        $('#input').val("");
        items += 1;
        $("#items-left").html(items)

    }
}