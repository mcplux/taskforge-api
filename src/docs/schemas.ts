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
 */
