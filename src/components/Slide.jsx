const slideOpts = {
  slidesPerView: 1.2,
  freeMode: true,
  setWrapperSize: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
};

<IonSlides className='fav-slides' pager={false} options={slideOpts}>
  {bottles.map((bottle) => {
    return (
      <IonSlide className='fav-slide' key={bottle.id}>
        <IonCard button className='fav-wine-card'>
          <img src={bottle.base64Url} alt='Wine bottle' />
          {/* TODO: Decide if keeping the fab or not */}
          {/* <IonFab vertical='top' horizontal='end'>
                    <IonFabButton size='small' color='transparent'>
                      <IonIcon icon={trashOutline} color='primary' />
                    </IonFabButton>
                  </IonFab> */}
          <IonCardHeader>
            <IonCardSubtitle mode='ios'>{bottle.type}</IonCardSubtitle>
            <IonCardTitle>{bottle.name}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonSlide>
    );
  })}
</IonSlides>;
