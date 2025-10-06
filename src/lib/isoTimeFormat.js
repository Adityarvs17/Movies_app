const isoTimeFormat = (date) => {
    const isoDate = new Date(date);
    const localTime= isoDate.toLocaleTimeString('en-US',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }
    );
    return localTime;
}
export default isoTimeFormat