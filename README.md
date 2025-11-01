# JS Applications Advanced (SoftUni - October 2025)

##  Project Overview

This repository serves as the educational portfolio for the **JavaScript Applications Advanced** course at SoftUni, focusing on modern front-end development principles.

The curriculum emphasizes building robust, modular, and maintainable applications through the implementation of:
* RESTful Services Integration
* Asynchronous Programming Patterns
* Client-Side Routing
* Modular Application Structure
* Client-Side Rendering Techniques

##  Repository Structure

The core modules and working areas are organized as follows:

| Directory | Content Focus |
| :--- | :--- |
| `02. Asynchronous Programming` | Exercises and demonstrations on Promises, Async/Await, and XHR/Fetch. |
| `server` | A lightweight Node.js server used for local development, API simulation, and testing exercises. |
| `workshop` | Working projects and code labs developed during official course workshops. |

##  Getting Started

Follow these steps to set up the project environment and run the examples locally.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)
* Git

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ivakto/js-applications-advanced.git](https://github.com/ivakto/js-applications-advanced.git)
    cd js-applications-advanced
    ```

2.  **Install Server Dependencies (If Applicable):**
    The server component is often required to run the client-side exercises.
    ```bash
    cd server
    npm install
    ```

3.  **Install Other Dependencies:**
    Depending on the module, you may need to install dependencies in specific folders (e.g., `workshop`). Check for a `package.json` file in those directories.

### Running the Server

To start the local API server:

```bash
cd server
npm start