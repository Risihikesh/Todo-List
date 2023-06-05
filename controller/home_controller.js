const TodoLists = require('../models/todo_list');

module.exports.home = async function(req, res) {
  try {
    const todo = await TodoLists.find({});
    
    return res.render('homePage', {
      title: "Home",
      todoList: todo
    });
  } catch (err) {
    console.log('error in fetching data', err);
    // Handle the error 
  }
}

// Function for creating a new todo list
function DateValue(dueDate) {
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'];
  
    let newdate = '';
    let monapp = '';
  
    if (dueDate[1] == '01') {
      monapp = months[0];
    } else if (dueDate[1] == '02') {
      monapp = months[1];
    } else if (dueDate[1] == '03') {
      monapp = months[2];
    } else if (dueDate[1] == '04') {
      monapp = months[3];
    } else if (dueDate[1] == '05') {
      monapp = months[4];
    } else if (dueDate[1] == '06') {
      monapp = months[5];
    } else if (dueDate[1] == '07') {
      monapp = months[6];
    } else if (dueDate[1] == '08') {
      monapp = months[7];
    } else if (dueDate[1] == '09') {
      monapp = months[8];
    } else if (dueDate[1] == '10') {
      monapp = months[9];
    } else if (dueDate[1] == '11') {
      monapp = months[10];
    } else if (dueDate[1] == '12') {
      monapp = months[11];
    }
    newdate = dueDate[2] + '-' + monapp + '-' + dueDate[0];
    return newdate;
  }
  
  module.exports.createTodo = async function(req, res) {
    const dueDate = req.body.dateValue.split('-');
    const newdate = DateValue(dueDate);
  
    try {
      const newArr = await TodoLists.create({
        desc: req.body.desc,
        category: req.body.category,
        dueDate: newdate
      });
  
      return res.redirect('/');
    } catch (err) {
      console.log('Oops, an error occurred', err);
      // Handle the error appropriately
    }
  }
  

// Function for deleting a To-do list
module.exports.deleteTodo = async function(req, res) {
  const sp = req.query.id;
  const newsp = sp.split(',');

  try {
    for (let i = 0; i < newsp.length; i++) {
      await TodoLists.findByIdAndDelete(newsp[i]);
    }

    return res.redirect('/');
  } catch (err) {
    console.log('err', err);
    // Handle the error appropriately
  }
}

// Function for fetching data for the edit page
module.exports.EditPage = async function(req, res) {
  try {
    const todoLists = await TodoLists.findById(req.query.id);

    return res.render('editPage', {
      title: 'Edit Page',
      todolist: todoLists
    });
  } catch (err) {
    console.log('Hi, there is an error', err);
    // Handle the error appropriately
  }
}

// Function for updating the todo details after editing
module.exports.editDetails = async function(req, res) {
  const dueDate = req.body.dueDate.split('-');
  const newdate = DateValue(dueDate);

  try {
    await TodoLists.updateOne(
      { _id: req.query.id },
      { $set: { desc: req.body.desc, category: req.body.category, dueDate: newdate } }
    );

    return res.redirect('/');
  } catch (err) {
    console.log('Error while updating', err);
    // Handle the error appropriately
  }
}
