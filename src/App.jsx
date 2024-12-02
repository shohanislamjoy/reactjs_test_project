
import DataTable from './components/data_table';
import DataChart from './components/data_chart';

const App = () => {
    return (
        <div>
            <h1>Stock Data Visualization</h1>
            <DataChart />
            <DataTable />
        </div>
    );
};

export default App;
