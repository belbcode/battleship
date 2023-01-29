import Row from "./Row";

const Field = ({ field }) => {
    console.log(field);
    return (
        <>
            {field.map((v, i) => (
                <Row key={i} row={v} />
            ))}
        </>
    );
};

export default Field;
