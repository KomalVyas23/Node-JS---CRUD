const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 1234;

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Student API',
            version: '1.0.0',
            description: 'API documentation for Student management',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
                description: 'Local server',
            },
        ],
        components: {
            schemas: {
                Student: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        age: {
                            type: 'integer',
                            example: 25,
                        },
                        grade: {
                            type: 'string',
                            example: 'A',
                        },
                    },
                    required: ['name', 'age', 'grade'],
                },
            },
        },
    },
    apis: ['./routes/studentRoutes.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Middleware
app.use(bodyParser.json());


// Connect to MongoDB
const dbURI = 'mongodb+srv://komal_shivangi:123454321@cluster0.knflfd8.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/api', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});