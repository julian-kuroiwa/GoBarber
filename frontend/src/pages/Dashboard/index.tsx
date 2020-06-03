import React, {useState, useCallback} from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, {DayModifiers} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {Container, Header, HeaderContainer, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment} from './styles';

import LogoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {signOut, user} = useAuth();

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.avaliable) {
      setSelectedDate(day);
    }
  }, [])

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <img src={LogoImg} alt="GoBarber"/>

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="" alt=""/>
              <strong>Name</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="" alt=""/>
                <strong>Name</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0,6]}]}
            modifiers={{
              avaliable: {daysOfWeek: [1,2,3,4,5]}
            }}
            onDayClick={handleDayChange}
            selectedDays={selectedDate}
          />
        </Calendar>
      </Content>
    </Container>
  )
};

export default Dashboard;
