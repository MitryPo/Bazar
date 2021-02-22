import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Cat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeItem: {
                id: null,
                name: ''
            },
        };
        this.fetchCategories = this.fetchCategories.bind(this)
    }

    componentDidMount() {
        fetch("api/category-list")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    categoryList: data
                })
            )
    }

    render() {
        var categories = this.state.categoryList
        var self = this
        return (
            <div>
                {categories.map(function (category, index) {
                    return (
                        <Typography
                            variant="h4"
                            component="h4"
                            key={index}>{category.name}
                        </Typography>
                    )
                })}
            </div>
        )
    }
}

export default Cat