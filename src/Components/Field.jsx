import Row from "./Row";

const Field = ({ field, handleCellClick }) => {
    return (
        <div className="field">
            {field.map((v, i) => (
                <Row key={i} row={v} handleCellClick={handleCellClick} />
            ))}
        </div>
    );
};

export default Field;
