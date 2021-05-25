
export default async function Fetcher(...args) {
    const res = await fetch(...args);
    if(!res.ok) {
        throw Error("Not a 200 code from api")
    }
    const data = await res.json();
    return data;
}