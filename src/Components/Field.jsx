import Row from "./Row";

const Field = ({ field }) => {
    return (
        <div className="field">
            {field.map((v, i) => (
                <Row key={i} row={v} />
            ))}
        </div>
    );
};

export default Field;
