import React from 'react';
import PropTypes from 'prop-types';
import Select from '../UI/Select';

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
export default class SortBy extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    sort_by: PropTypes.string.isRequired,
  };
  // при монтировании задает базовые пропсы, записывается только раз
  // статические объекты или массивы загоняем в defaultProps, чтобы при каждом рендере не создавалась новая ссылка на хардкод
  static defaultProps = {
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
    ],
  };
  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    console.log('SortBy render');

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
