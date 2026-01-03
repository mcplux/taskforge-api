import { Router } from 'express'

const taskRouter = Router()

taskRouter.post('/', () => {
  console.log('Create new task')
})

export default taskRouter
