# Random Quote API Service

The **Random Quote API Service** is a JavaScript server application that provides an API for working with a quote database. The project uses Docker, Sequelize, and Adminer for convenient development and data management.

-----

## Project Structure

All application source files are located in the `server/` folder.

-----

## Running in Development Mode

1.  Navigate to the `server` directory:

    ```bash
    cd server
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Copy the environment variables file:

    ```bash
    cp .env.example .env
    ```

4.  Edit `.env`, specifying the necessary values.

5.  Start the Docker containers:

    ```bash
    docker compose up -d
    ```

6.  Run database migrations:

    ```bash
    npx sequelize db:migrate
    ```

7.  Import quotes into the database:

    ```bash
    npm run import:quotes
    ```

    Loading will take 1–2 minutes. Approximately **100,000** quotes will be added to the database.

8.  Run application:

    ```bash
    npm run dev
    ```
-----

## Adminer

For database management, you can use **Adminer**, available at:

http://localhost:8080

-----

## Dependencies

  * Node.js
  * Docker & Docker Compose
  * Sequelize ORM
  * Adminer (via Docker)

-----

## API Endpoints

All responses are returned in JSON format. The base path for all requests is `/api/quotes`.

-----

### 1\. Get a List of Quotes

**GET** `/api/quotes`

  * **Description**: Get a list of quotes with filtering and pagination capabilities.

  * **Query Parameters**:

      * `limit` — maximum number of records (default: 10, max: 50)
      * `offset` — offset (for pagination)
      * `author` — filter by author
      * `category` — filter by category
      * `text` — search by quote text

  * **Response**:

    ```json
    {
      "data": [
        {
          "id": 1,
          "text": "Quote...",
          "author": "Author",
          "categories": ["philosophy", "life"]
        }
      ],
      "meta": {
        "limit": 10,
        "offset": 0
      }
    }
    ```

-----

### 2\. Get Quote by ID

**GET** `/api/quotes/:id`

  * **Description**: Get a quote by its unique identifier.

  * **Response**:

    ```json
    {
      "data": {
        "id": 123,
        "text": "Quote...",
        "author": "Author",
        "categories": ["motivation"]
      }
    }
    ```

-----

### 3\. Get Random Quotes

**GET** `/api/quotes/random`

  * **Description**: Get a random quote or several random quotes.

  * **Query Parameters**:

      * `limit` — number of random quotes (default: 1, max: 50)

  * **Response**:

    ```json
    {
      "data": [
        {
          "id": 42,
          "text": "Random quote...",
          "author": "Author"
        }
      ],
      "meta": {
        "limit": 1
      }
    }
    ```

-----

### 4\. Create a New Quote

**POST** `/api/quotes`

  * **Description**: Add a new quote.

  * **Body (JSON)**:

    ```json
    {
      "text": "New quote",
      "author": "Author Name",
      "categories": ["life", "wisdom"]
    }
    ```

  * **Response** (`200 OK`):

    ```json
    {
      "data": {
        "id": 101,
        "text": "New quote",
        "author": "Author Name",
        "categories": ["life", "wisdom"]
      }
    }
    ```

-----

### 5\. Modify an Existing Quote

**PATCH** `/api/quotes/:id`

  * **Description**: Partially update quote parameters.

  * **Body (JSON)** — any fields can be passed for update:

    ```json
    {
      "text": "Updated text",
      "categories": ["new category"]
    }
    ```

  * **Response** (`200 OK`):

    ```json
    {
      "data": {
        "id": 123,
        "text": "Updated text",
        "author": "Author",
        "categories": ["new category"]
      }
    }
    ```

-----

### 6\. Delete a Quote

**DELETE** `/api/quotes/:id`

  * **Description**: Delete a quote by its ID.
  * **Response**: `204 No Content` (no body)

-----

## Error Format

In case of an error, the API returns a response in the following format:

```json
{
  "error": {
    "code": 400,
    "message": "Invalid request",
    "errors": [
      {
        "field": "text",
        "message": "The 'text' field is required"
      },
      {
        "field": "author",
        "message": "The 'author' field cannot be empty"
      }
    ]
  }
}
```

  * `code` — HTTP error status (e.g., 400, 404, 500)
  * `message` — brief description of the error
  * `errors` — (optional) an array with details for each field if the error is related to data validation

-----

### Examples of Possible Errors

| Code | Message             | Description                            |
| ---- | ------------------- | -------------------------------------- |
| 400  | Invalid request     | Input data validation error            |
| 404  | Quote not found     | Object with the given `id` does not exist |
| 500  | Internal server error | Unexpected server error                |

-----