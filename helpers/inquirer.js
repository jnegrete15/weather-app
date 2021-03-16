
const inquirer = require('inquirer')
require('colors')

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${"1.".green} Search city`
      },
      {
        value: 2,
        name: `${"2.".green} History`
      },
      {
        value: 3,
        name: `${"3.".green} Exit`
      }
    ]
  }
]

const inquirerMenu = async() => {

  console.clear();
  console.log("======================".green);
  console.log("  Choose an option");
  console.log("======================\n".green);

  const opt = await inquirer.prompt(menuOptions)

  return opt.option;
}

const pause = async() => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Type ${"ENTER".cyan} to continue`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question)
  
}

const readInput = async(message) => {

  const question  = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value){
        if(value.length === 0){
          return 'Please type a description'
        }
        return true
      }
    }
  ];

  const {desc} = await inquirer.prompt(question)
  return desc
}

const listPlaces = async( places = []) => {

  const choices = places.map( ( place, i) => {

    const id = `${i+1}.`.green;

    return {
      value: place.id,
      name: `${id} ${place.name}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  });

  const questions = [
    {
      type:'list',
      name: 'id',
      message: "Select a place",
      choices
    }
  ]

  const {id} = await inquirer.prompt(questions);
  return id
}

const confirm = async(message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question)
  return ok;
}

const showCheckList = async( tasks = []) => {

  const choices = tasks.map( ( task, i) => {

    const id = `${i+1}.`.green;

    return {
      value: task.id,
      name: `${id} ${task.description}`,
      checked: ( task.completedAt) ? true : false
    }
  });

  const questions = [
    {
      type:'checkbox',
      name: 'ids',
      message: "Select",
      choices
    }
  ]

  const {ids} = await inquirer.prompt(questions);
  return ids
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showCheckList
}

