/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
interface IncomeCreditProps {
    selectedBranch: string;
    defaultDates: boolean;
}

function CreditExpense({ selectedBranch, defaultDates }: IncomeCreditProps) {
    console.log('selectedBranch: ', selectedBranch)
    console.log('defaultDates: ', defaultDates)
    return (
        <div>CreditExpense</div>
    );
}

export default CreditExpense;
