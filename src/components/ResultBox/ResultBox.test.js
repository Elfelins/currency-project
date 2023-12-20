import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';
  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '100', result: 'PLN 100.00 = $28.57' },
            { amount: '20', result: 'PLN 20.00 = $5.71' },
            { amount: '200', result: 'PLN 200.00 = $57.14' },
            { amount: '345', result: 'PLN 345.00 = $98.57' }
        ];
        for(const testObj of testCases) {
            render(<ResultBox from="PLN" to="USD" amount={parseFloat(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.result);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', result: '$100.00 = PLN 350.00' },
            { amount: '20', result: '$20.00 = PLN 70.00' },
            { amount: '200', result: '$200.00 = PLN 700.00' },
            { amount: '345', result: '$345.00 = PLN 1,207.50' }
        ];
        for(const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={parseFloat(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.result);
            cleanup();
        }
    });
    it('should render proper info about conversion when the currency is the same', () => {
        const testCases = [
            { currency: 'USD', amount: '100', result: '$100.00 = $100.00' },
            { currency: 'PLN', amount: '100', result: 'PLN 100.00 = PLN 100.00' },
        ];
        for(const testObj of testCases) {
            render(<ResultBox from={testObj.currency} to={testObj.currency} amount={parseFloat(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.result);
            cleanup();
        }
    }); 
    it('should render a wrong value string about conversion when the output is negative', () => {
        const testCases = [
            { amount: '-100.3', result: 'Wrong value...' },
            { amount: '-20', result: 'Wrong value...' },
            { amount: '-200.55', result: 'Wrong value...' },
            { amount: '-345', result: 'Wrong value...' }
        ];
        for(const testObj of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={parseFloat(testObj.amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.result);
            cleanup();
        }
    });      
});