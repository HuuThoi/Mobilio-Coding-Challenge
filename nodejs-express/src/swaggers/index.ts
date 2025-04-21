export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Product API',
        version: '1.0.0',
        description: 'API for managing products'
    },
    paths: {
        '/api/v1/products': {
            get: {
                summary: 'Get all products',
                responses: {
                    '200': {
                        description: 'List of products',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Product' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Create a new product',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ProductInput' }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Product created',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Product' }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    price: { type: 'number' }
                }
            },
            ProductInput: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    price: { type: 'number' }
                },
                required: ['name', 'price']
            }
        }
    }
};
