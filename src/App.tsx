import React, {FC, useEffect} from 'react';
import './App.css';
import {Home} from "./components/pages/home/Home";
import {TodoListsService} from "./services/todo-lists.service";
import {TasksService} from "./services/tasks.service";

export const App: FC = () => {

    // useEffect(() => {
    //     TodoListsService.getAll()
    // }, [])
    //
    // useEffect(() => {
    //     TodoListsService.create('sds;dsdsd fuck man').then(res => console.log(res.data))
    // }, [])
    //
    // useEffect(() => {
    //     TodoListsService.update('paskuda', "653dc46a-522b-4125-b5ff-30278e7b2dfd")
    // }, [])
    //
    // useEffect(() => {
    //     TodoListsService.delete("a2531621-b4ed-44ff-a116-3ba8fcd64c0a")
    // }, [])

    // useEffect(() => {
    //     TasksService.getAll("653dc46a-522b-4125-b5ff-30278e7b2dfd")
    // }, [])

    // useEffect(() => {
    //     TasksService.create("653dc46a-522b-4125-b5ff-30278e7b2dfd", 'two task')
    // }, [])

    // const newModel = {
    //     title: 'updated',
    //     description: 'ssddsdd',
    //     completed: true,
    //     status: 1,
    //     priority: 1,
    //     startDate: null,
    //     deadline: null
    // }
    //
    // useEffect(() => {
    //     TasksService.update("653dc46a-522b-4125-b5ff-30278e7b2dfd", "2ed23d37-bb1c-4b8b-949b-4c6329102053", newModel)
    // }, [])

    // useEffect(() => {
    //     TasksService.delete("653dc46a-522b-4125-b5ff-30278e7b2dfd", "2ed23d37-bb1c-4b8b-949b-4c6329102053")
    // }, [])


    console.log('app is render')
    return <Home/>
}




