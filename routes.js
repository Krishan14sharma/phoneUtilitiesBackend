import express from 'express'
const routes = express.Router();

const response={
    'lead':'sherlock',
    'villian':'moriarity'
};
//todo
const accessToken = "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6InIwVFZ2ZE81UWtPTDVNV2Fnd29pTGc9PSIsImV4cGlyZXNfYXQiOjE1MjMxODMyNjYsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.jr-llu1PshubppmIdwnxAp-Ng976uMEekiFdTezpNJA"


routes.get('/hello', (req, res) => {
    res.json(response);
});
export default routes;