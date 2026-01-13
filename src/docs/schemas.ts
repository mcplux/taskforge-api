/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterRequest:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          minLength: 1
 *          example: Juan Pablo
 *        email:
 *          type: string
 *          format: email
 *          example: juan@test.com
 *        password:
 *          type: string
 *          minLength: 8
 *          example: secret_password
 *
 *    LoginRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: juan@test.com
 *        password:
 *          type: string
 *          example: secret_password
 *
 *    CreateTaskRequest:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          minLength: 1
 *          example: Buy bread
 *        description:
 *          type: string
 *          example: A very long description for this task
 *        dueDate:
 *          type: string
 *          format: date
 *          example: 2026-03-25
 */
