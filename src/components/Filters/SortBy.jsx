import React from 'react';
//import PropTypes from 'prop-types';
import Select from '../UI/Select';

const initialOptions = {
  options: [
    {
      label: 'Популярные по убыванию',
      value: 'popularity.desc',
    },
    {
      label: 'Популярные по возрастанию',
      value: 'popularity.asc',
    },
    {
      label: 'Рейтинг по убыванию',
      value: 'vote_average.desc',
    },
    {
      label: 'Рейтинг по возрастанию',
      value: 'vote_average.asc',
    },
    {
      label: 'Дата выхода по убыванию',
      value: 'release_date.desc',
    },
    {
      label: 'Дата выхода по возрастанию',
      value: 'release_date.asc',
    },
    {
      label: 'Дата проката по убыванию',
      value: 'release_date.desc',
    },
    {
      label: 'Дата проката по возрастанию',
      value: 'release_date.asc',
    },
    {
      label: 'Дата премьеры по убыванию',
      value: 'primary_release_date.desc',
    },
    {
      label: 'Дата премьеры по возрастанию',
      value: 'primary_release_date.asc',
    },
    {
      label: 'Выручка по убыванию',
      value: 'revenue.desc',
    },
    {
      label: 'Выручка по возрастанию',
      value: 'revenue.asc',
    },
    {
      label: 'Голоса пользователей по убыванию',
      value: 'vote_count.desc',
    },
    {
      label: 'Голоса пользователей по возрастанию',
      value: 'vote_count.asc',
    },
  ],
};

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
export default class SortBy extends React.PureComponent {
  // static propTypes = {
  //   onChangeFilters: PropTypes.func.isRequired,
  //   sort_by: PropTypes.string.isRequired,
  // };

  // при монтировании задает базовые пропсы, записывается только раз
  // статические объекты или массивы загоняем в defaultProps, чтобы при каждом рендере не создавалась новая ссылка на хардкод

  state = initialOptions;

  componentDidUpdate(prevProps) {
    if (this.props.getFavoritesIsClicked !== prevProps.getFavoritesIsClicked) {
      if (this.props.getFavoritesIsClicked) {
        this.setState({
          options: [
            {
              label: 'Дата добавления по возрастанию',
              value: 'created_at.asc',
            },
            {
              label: 'Дата добавления по убыванию',
              value: 'created_at.desc',
            },
          ],
        });
      } else {
        this.setState(initialOptions);
      }
    }
  }

  render() {
    const { sort_by, onChangeFilters } = this.props;
    const { options } = this.state;
    //  console.log('SortBy render');

    return (
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
    );
  }
}
