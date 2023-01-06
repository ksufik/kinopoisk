import React from 'react';
import { withAuth } from '../HOC/withAuth';
//import PropTypes from 'prop-types';
import Select from '../UI/Select';

// options: [
// 	{
// 		label: 'Популярные по убыванию',
// 		value: 'popularity.desc',
// 	},
// 	{
// 		label: 'Популярные по возрастанию',
// 		value: 'popularity.asc',
// 	},
// 	{
// 		label: 'Рейтинг по убыванию',
// 		value: 'vote_average.desc',
// 	},
// 	{
// 		label: 'Рейтинг по возрастанию',
// 		value: 'vote_average.asc',
// 	},
// 	{
// 		label: 'Дата выхода по убыванию',
// 		value: 'release_date.desc',
// 	},
// 	{
// 		label: 'Дата выхода по возрастанию',
// 		value: 'release_date.asc',
// 	},
// 	{
// 		label: 'Дата проката по убыванию',
// 		value: 'release_date.desc',
// 	},
// 	{
// 		label: 'Дата проката по возрастанию',
// 		value: 'release_date.asc',
// 	},
// 	{
// 		label: 'Дата премьеры по убыванию',
// 		value: 'primary_release_date.desc',
// 	},
// 	{
// 		label: 'Дата премьеры по возрастанию',
// 		value: 'primary_release_date.asc',
// 	},
// 	{
// 		label: 'Выручка по убыванию',
// 		value: 'revenue.desc',
// 	},
// 	{
// 		label: 'Выручка по возрастанию',
// 		value: 'revenue.asc',
// 	},
// 	{
// 		label: 'Голоса пользователей по убыванию',
// 		value: 'vote_count.desc',
// 	},
// 	{
// 		label: 'Голоса пользователей по возрастанию',
// 		value: 'vote_count.asc',
// 	},
// ],

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
class SortBy extends React.PureComponent {
  // static propTypes = {
  //   onChangeFilters: PropTypes.func.isRequired,
  //   sort_by: PropTypes.string.isRequired,
  // };

  // state = {
  //   isClicked: false,
  // };

  state = {
    isClicked: false,
    sort_by_arr: null,
    //options: this.initialOptions,
  };

  initialOptions = () => {
    return [
      {
        label: 'Популярные',
        value: `popularity.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
      {
        label: 'Рейтинг',
        value: `vote_average.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
      {
        label: 'Дата выхода',
        value: `release_date.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
      {
        label: 'Дата проката',
        value: `release_date.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
      {
        label: 'Дата премьеры',
        value: `primary_release_date.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
      {
        label: 'Выручка',
        value: `revenue.${this.state.isClicked ? 'asc' : 'desc'}`,
      },

      {
        label: 'Голоса пользователей',
        value: `vote_count.${this.state.isClicked ? 'asc' : 'desc'}`,
      },
    ];
  };

  withoutOrder = (string) => {
    const sort_by_arr = string.split('.');
    return sort_by_arr[0];
  };

  withOrder = (string) => {
    let sort_by_arr = this.withoutOrder(string);
    sort_by_arr += this.state.isClicked ? '.acs' : '.desc';
    return sort_by_arr;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.auth.getFavoritesIsClicked !==
      prevProps.auth.getFavoritesIsClicked
    ) {
      if (this.props.auth.getFavoritesIsClicked) {
        this.setState({
          options: [
            {
              label: 'Дата добавления по убыванию',
              value: 'created_at.desc',
            },
            {
              label: 'Дата добавления по возрастанию',
              value: 'created_at.asc',
            },
          ],
        });
      } else {
        this.setState({
          options: this.initialOptions,
        });
      }
    }

    if (this.props.sort_by !== prevProps.sort_by) {
      this.setState({
        sort_by_arr: this.withoutOrder(this.props.sort_by),
      });
    }

    // if (
    //   this.props.filters !== prevProps.filters &&
    //   this.state.sort_by_arr !== prevState.sort_by_arr
    //   // !prevState.isClicked &&
    //   // prevState.isClicked === this.state.isClicked
    // ) {
    //   this.setState({
    //     isClicked: false,
    //   });
    //   console.log('prevProps', prevProps);
    //   console.log('this.props.sort_by', this.props.sort_by);
    //   console.log('prevState', prevState);
    // }
  }

  onClick = (sort_by) => {
    // не работает, выдает undefined
    //console.log('event.target.value:', event.target.value);
    this.setState(
      (prevState) => ({
        isClicked: !prevState.isClicked,
      }),
      () => {
        // const sort_by_arr = sort_by.split('.');
        //  const sort_by_arr = this.withoutOrder(sort_by);
        this.setState({
          sort_by_arr: this.withoutOrder(sort_by),
        });
        //sort_by_arr[1] = this.state.isClicked ? 'acs' : 'desc';

        //  console.log('sort_by_arr:', sort_by_arr);

        //   this.props.onChangeFilters({
        //     target: {
        //       name: 'sort_by',
        //       value: this.withOrder(sort_by),
        //     },
        //   });
      }
    );
  };

  // стрелка возвращается в базовое значение: меняются фильтры (если сорт бай другой, если такой же, то нет)
  //

  render() {
    const { sort_by, onChangeFilters } = this.props;
    const { isClicked } = this.state;
    const options = this.initialOptions();
    console.log('isClicked:', isClicked);
    console.log('options', options);
    console.log('sort_by', sort_by);

    return (
      <div style={{ display: 'flex', position: 'relative' }}>
        <span
          className="material-icons"
          style={{
            cursor: 'pointer',
            alignSelf: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          onClick={() => this.onClick(sort_by)}
        >
          {isClicked ? 'vertical_align_top' : 'vertical_align_bottom'}
        </span>
        <Select
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
          labelText="Сортировать по:"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    );
  }
}

export default withAuth(SortBy);
