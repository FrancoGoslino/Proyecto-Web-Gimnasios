import { Card } from "react-bootstrap"

import ScrollToTop from "../ScrollTop"

export default function Error404(){

    return (
        <div>
            <ScrollToTop />
            <Card style={{ backgroundColor: "transparent" }}>
                <h1 style={{ padding: "20px", marginTop: "80px", textDecoration: "none", color: "white"}}> Ups.. La página no existe. </h1>
                <img src="https://media.tenor.com/CLgKE5rCzZ0AAAAM/workout-dance.gif" alt="" style={{ width: "40%", height: "auto" }}/>
            </Card>
        </div>
    )
}