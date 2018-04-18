import {inject, TestBed} from '@angular/core/testing';

import {MainMenuNavigationService} from './main-menu-navigation.service';

describe('MainMenuNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainMenuNavigationService]
    });
  });

  it('should be created', inject([MainMenuNavigationService], (service: MainMenuNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
