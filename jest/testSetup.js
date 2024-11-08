// Mock pg-promise and its color utility
jest.mock('pg-promise/lib/utils/color', () => ({
    writeNormal: jest.fn(),
    writeError: jest.fn(),
    writeSuccess: jest.fn()
}));

jest.mock('pg-promise', () => {
    return () => {
        return () => ({
            one: jest.fn(),
            any: jest.fn(),
            none: jest.fn()
        });
    };
}); 